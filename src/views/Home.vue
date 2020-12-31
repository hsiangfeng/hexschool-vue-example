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
        </tr>
      </tbody>
    </table>
    <a href="http://" class="btn btn-primary" @click.prevent="postCarts"
      >送出購物車內容</a
    >
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
      isLoading: false,
      data: [],
      carts: [],
      carData: JSON.parse(localStorage.getItem('carData')) || [],
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/products/all`)
        .then((res) => {
          this.data = res.data.products;
          this.isLoading = false;
        });
    },
    getCarts() {
      this.isLoading = true;
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.isLoading = false;
        });
    },
    addtoCarts(data) {
      const cacheCarID = []; // 暫存 ID 放置處

      // 一開始先將 carData 中的 ID 全部撈出來
      this.carData.forEach((item) => cacheCarID.push(item.product_id));

      // 接下來使用 indexOf 尋找傳進來的參數 ID 是否有在該陣列中
      // 若不存在則會回傳 -1 並加入到陣列儲存在 localStorage
      // 若存在則會回傳 0 並改走 else
      if (cacheCarID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id,
          qty: 1,
          name: data.title,
        };
        this.carData.push(cartContent);
        localStorage.setItem('carData', JSON.stringify(this.carData));
      } else {
        this.carData.forEach((item, keys) => {
          if (item.product_id === data.id) {
            let { qty } = item;
            const cache = {
              product_id: data.id,
              qty: qty += 1,
              name: data.title,
            };
            this.carData.splice(keys, 1);
            this.carData.push(cache);
            localStorage.setItem('carData', JSON.stringify(this.carData));
          }
        });
      }
    },
    postCarts() {
      this.isLoading = true;
      // 避免重複加入因此要先跑一次清空購物車
      const cacheID = [];
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          console.log(res);
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        }).then(() => {
          // 清除購物車
          cacheID.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${item}`).then(() => {
              console.log('購物車已經清空');
            });
          });
        }).then(() => {
          this.carData.forEach((item) => {
            console.log(item);
            const cache = {
              product_id: item.product_id,
              qty: item.qty,
            };
            this.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                this.carData = [];
                localStorage.removeItem('carData');
                this.isLoading = false;
                this.getCarts();
              });
          });
        });
    },
    deleteCarts() {
      this.isLoading = true;
      const cacheID = [];
      this.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart`)
        .then((res) => {
          console.log(res);
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        }).then(() => {
          // 清除購物車
          cacheID.forEach((item) => {
            this.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_COUSTOMPATH}/cart/${item}`).then(() => {
              this.isLoading = false;
              this.getCarts();
            });
          });
        });
    },
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
