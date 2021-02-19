<template>
  <div class="home container">
    <Loading :active.sync="isLoading"></Loading>
    <h2>加入購物車</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="item in data"
        class="card"
        style="width: 18rem"
        :key="item.id"
      >
        <img :src="item.image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <a href="#" class="btn btn-primary" @click.prevent="addtoCarts(item)"
            >加入購物車</a
          >
        </div>
      </div>
    </div>
    <hr />
    <h2>購物車(localStorage)</h2>
    <table class="table">
      <thead>
        <th>ID</th>
        <th>名稱</th>
        <th>數量</th>
        <th>原始金額</th>
        <th>販售金額</th>
      </thead>
      <tbody>
        <tr v-for="item in carData" :key="item.id">
          <td>
            {{ item.product_id }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.qty }}
          </td>
          <td>
            {{ item.origin_price }}
          </td>
          <td>
            {{ item.price }}
          </td>
        </tr>
      </tbody>
    </table>
    <h5>localStorage 金額：{{ localStoragePrice }}</h5>
    <small>
      以下功能將會同時將產品金額與 localStorage 金額通通改成 0。
      <br />該區塊功能主要是說明，就算修改 localStorage
      金額是不影響送出後的訂單金額，其主要原因實際計算金額還是在後端。
    </small>
    <div>
      <a href="http://" class="btn btn-primary" @click.prevent="getLocalStorage"
        >取得 LocalStorage 金額</a
      >
      |
      <a
        href="http://"
        class="btn btn-primary"
        @click.prevent="editLocalStorage"
        >修改 LocalStorage 金額</a
      >
    </div>
    <hr />
    <h5>販售金額：{{ getPrice }}</h5>
    <div>
      <a href="http://" class="btn btn-primary" @click.prevent="postCarts"
        >送出購物車內容</a
      >
      |
      <a
        href="http://"
        class="btn btn-primary"
        @click.prevent="deleteLocalStorage"
        >清空購物車(LocalStorage)</a
      >
    </div>
    <hr />
    <h2>購物車(遠端結果)</h2>
    <table class="table">
      <thead>
        <th>ID</th>
        <th>名稱</th>
        <th>數量</th>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.product.title }}
          </td>
          <td>
            {{ item.qty }}
          </td>
        </tr>
      </tbody>
    </table>
    <h5>final_total: {{ cartsFinalTotal }}</h5>
    <h5>total: {{ cartsTotal }}</h5>
    <a href="http://" class="btn btn-primary" @click.prevent="deleteCarts"
      >清空購物車</a
    >
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false, // 讀取狀態
      data: [], // 產品列表資料放置處
      carts: [], // 購物車內容
      carData: JSON.parse(localStorage.getItem('carData')) || [], // localStorage 資料
      localStoragePrice: 0, // localStorage 的金額
      cartsFinalTotal: 0, // 遠端 final_total
      cartsTotal: 0, // 遠端 total
    };
  },
  methods: {
    // 取得產品列表
    getProducts() {
      this.isLoading = true;
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/products/all`)
        .then((res) => {
          this.data = res.data.products;
          this.isLoading = false;
        });
    },
    // 取得購物車內容
    getCarts() {
      this.isLoading = true;
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;

          // 取得購物車金額
          this.carts.forEach((item) => {
            this.cartsTotal += Number(item.total);
            this.cartsFinalTotal += Number(item.final_total);
          });

          this.isLoading = false;
        });
    },
    // 加入購物車(localStorage)
    addtoCarts(data) {
      const cacheCarID = []; // 暫存 ID 放置處

      // 一開始先將 carData 中的 ID 全部撈出來
      this.carData.forEach((item) => {
        cacheCarID.push(item.product_id);
      });

      // 接下來使用 indexOf 尋找傳進來的參數 ID 是否有在該陣列中
      // 若不存在則會回傳 -1 並加入到陣列儲存在 localStorage
      // 若存在則會回傳 0 並改走 else
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id, // 產品 ID
          qty: 1, // 產品數量，預設一筆
          name: data.title, // 產品標題
          origin_price: data.origin_price, // 產品原始金額
          price: data.price, // 產品銷售金額
        };
        // 將數量推回陣列中
        this.carData.push(cartContent);
        // 重新寫入 localStorage
        localStorage.setItem('carData', JSON.stringify(this.carData));
      } else {
        let cache = {}; // 產品暫存處
        this.carData.forEach((item, keys) => {
          // 只找相同的產品內容
          if (item.product_id === data.id) {
            let { qty } = item; // 取出已存在 localStorage 購物車的資料並加數量增加
            cache = {
              product_id: data.id, // 產品 ID
              qty: qty += 1, // 產品當前數量，針對數量增加數量
              name: data.title, // 產品標題
              origin_price: data.origin_price, // 產品原始金額
              price: data.price, // 產品銷售金額
            };
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            this.carData.splice(keys, 1);
          }
        });
        // 將數量已經增加的資料推回陣列中
        this.carData.push(cache); // 不建議放在 forEach 內，否則迴圈會重複執行導致變成加二
        // 重新寫入 localStorage
        localStorage.setItem('carData', JSON.stringify(this.carData));
      }
    },
    // 送出購物車資料
    postCarts() {
      this.isLoading = true;
      // 避免重複加入因此要先跑一次清空購物車
      const cacheID = [];
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          // 取得「當前購物車內」的產品
          const cacheData = res.data.data.carts;
          // 撈出產品 ID 一一加入到暫存的陣列
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        }).then(() => {
          // 清空「當前購物車內」的資料，否則會重複加入
          cacheID.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${item}`).then(() => {
              console.log('購物車已經清空');
            });
          });
        }).then(() => {
          // 將當前暫存在 carData 的資料撈出來
          this.carData.forEach((item) => {
            // 取出產品 id 與數量
            const cache = {
              product_id: item.product_id,
              qty: item.qty,
            };
            // 一一加入到購物車內
            this.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                // 確保送出訂單之後清空購物車內容
                this.carData = [];
                localStorage.removeItem('carData');
                this.isLoading = false;
                // 重新取得購物車內容
                this.getCarts();
              });
          });
        });
    },
    // 清空購物車
    deleteCarts() {
      this.isLoading = true;
      const cacheID = [];
      // 取得「當前購物車內」的產品
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id); // 取出購物車內的 ID
          });
        }).then(() => {
          // 清除購物車
          cacheID.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${item}`).then(() => {
              this.isLoading = false;
              this.getCarts();
            });
          });
          this.cartsFinalTotal = 0;
          this.cartsTotal = 0;
        }).then(() => {
          this.isLoading = false;
        });
    },
    // 清空畫面上的資料並重新設置 localStorage
    deleteLocalStorage() {
      localStorage.removeItem('carData');
      this.carData = JSON.parse(localStorage.getItem('carData')) || [];
      this.localStoragePrice = 0;
    },
    // 取得 localStorage 金額
    getLocalStorage() {
      this.localStoragePrice = 0;
      const cacheLocalStorage = JSON.parse(localStorage.getItem('carData')) || [];

      cacheLocalStorage.forEach((item) => {
        this.localStoragePrice += Number(item.price * item.qty);
      });
    },
    // 編輯 localStorage 金額並儲存回去 carData
    editLocalStorage() {
      const cacheLocalStorage = JSON.parse(localStorage.getItem('carData')) || [];

      cacheLocalStorage.forEach((item) => {
        // eslint-disable-next-line
        item.price = 0;
        // eslint-disable-next-line
        item.origin_price = 0;
      });
      this.carData = cacheLocalStorage;
      localStorage.setItem('carData', JSON.stringify(this.carData));
      this.getLocalStorage();
    },
  },
  computed: {
    getPrice() {
      // 若 carData 長度是空的就直接回傳 0
      if (this.carData.length === 0) {
        return 0;
      }

      // 當長度大於 1 的時候才計算回傳
      if (this.carData.length > 1) {
        let cachePrice = 0;
        this.carData.forEach((item) => {
          cachePrice += Number(item.price * item.qty);
        });
        return cachePrice;
      }

      // 當只有一筆的時候就直接回傳一筆的計算結果
      return this.carData[0].price * this.carData[0].qty;
    },
  },
  // 取得產品列表與購物車內容
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
