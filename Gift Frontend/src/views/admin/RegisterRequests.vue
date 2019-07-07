<!-- =========================================================================================
    File Name: TableStriped.vue
    Description: Rendering default table with striped style
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="vx-row" v-if="cartItems.length">
    <!-- LEFT COL -->
    <div class="vx-col lg:w-2/3 w-full relative">
      <div class="items-list-view" v-for="item in cartItems" :key="item.objectID">
        <item-list-view :item="item">
          <!-- SLOT: ITEM META -->
          <template slot="item-meta">
            <h5 class="item-name font-semibold mb-1">
              {{ item.username }}
              <span class="text-primary font-semibold ml-5">{{ item.email }}</span>
            </h5>

            <h6 class="mt-4 font-bold text-sm">
              Commercial Record:
              <span class="text-primary font-semibold ml-5">{{ item.commercialRecord }}</span>
            </h6>
            <h6 class="mt-4 font-bold text-sm">
              City:
              <span class="text-primary font-semibold ml-5">{{ item.city }}</span>
            </h6>
            <h6 class="mt-4 font-bold text-sm" v-if="item.neighborhood">
              Neighborhood:
              <span class="text-primary font-semibold ml-5">{{ item.neighborhood }}</span>
            </h6>
            <h6 class="mt-4 font-bold text-sm">
              Branch:
              <span class="text-primary font-semibold ml-5">{{ item.branch }}</span>
            </h6>
          </template>

          <!-- SLOT: ACTION BUTTONS -->
          <template slot="action-buttons">
            <!-- PRIMARY BUTTON: REMOVE -->
            <div
              class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
              @click="removeItemFromCart(item)"
            >
              <feather-icon icon="XIcon" svgClasses="h-4 w-4"/>
              <span class="text-sm font-semibold ml-2">REMOVE</span>
            </div>

            <!-- SECONDARY BUTTON: MOVE-TO/VIEW-IN WISHLIST -->
            <div
              class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
              @click="wishListButtonClicked(item)"
            >
              <feather-icon icon="HeartIcon" :svgClasses="['h-4 w-4']"/>
              <span class="text-sm font-semibold ml-2">ACCEPT</span>
            </div>
          </template>
        </item-list-view>
      </div>
    </div>
  </div>
</template>

<script>
const ItemListView = () => import("./components/ItemListView.vue");
export default {
  data() {
    return {
      cartItems: [
        {
          objectID: "5546604",
          username: "SEIKO",
          email: "seiko@gmail.com",
          commercialRecord: "click this link",
          license: "license_1.jpg",
          city: "aaaaaaaa",
          neighborhood: "bbbbbbbbb",
          branch: "ccccccc",
          country: "Russia",
          description:
            "Durable, lightweight aluminum cases in silver, space gray, gold, and rose gold. Sport Band in a variety of colors. All the features of the original Apple Watch, plus a new dual-core processor for faster performance. All models run watchOS 3. Requires an iPhone 5 or later.",
          createdAt: "2019/6/13 23:20:10"
        },
        {
          objectID: "5546612",
          username: "Apple",
          email: "apple@gmail.com",
          commercialRecord: "click this link",
          license: "license_1.jpg",
          city: "wefwsfafs",
          neighborhood: "fdsfwefaf",
          branch: "sfdfswe",
          country: "America",
          description:
            "Durable, lightweight aluminum cases in silver, space gray, gold, and rose gold. Sport Band in a variety of colors. All the features of the original Apple Watch, plus a new dual-core processor for faster performance. All models run watchOS 3. Requires an iPhone 5 or later.",
          createdAt: "2019/6/13 23:20:10"
        },
        {
          objectID: "5546614",
          username: "HUAWEI",
          email: "huawei@gmail.com",
          commercialRecord: "click this link",
          license: "license_1.jpg",
          city: "afwefwf",
          neighborhood: "asfwefaf",
          branch: "dfwfefg",
          country: "China",
          description:
            "Durable, lightweight aluminum cases in silver, space gray, gold, and rose gold. Sport Band in a variety of colors. All the features of the original Apple Watch, plus a new dual-core processor for faster performance. All models run watchOS 3. Requires an iPhone 5 or later.",
          createdAt: "2019/6/13 23:20:10"
        },
        {
          objectID: "5546623",
          username: "Lorax",
          email: "lorax@gmail.com",
          commercialRecord: "click this link",
          license: "license_1.jpg",
          city: "wefafs",
          neighborhood: "sdfafwefw",
          branch: "asfwefqaew",
          country: "Canada",
          description:
            "Durable, lightweight aluminum cases in silver, space gray, gold, and rose gold. Sport Band in a variety of colors. All the features of the original Apple Watch, plus a new dual-core processor for faster performance. All models run watchOS 3. Requires an iPhone 5 or later.",
          createdAt: "2019/6/13 23:20:10"
        },
        {
          objectID: "5546656",
          username: "SUMSONG",
          email: "sumsong@gmail.com",
          commercialRecord: "click this link",
          license: "license_1.jpg",
          city: "wefagsdsf",
          neighborhood: "sdfwefaege",
          branch: "asdfwefagasdfw",
          country: "Korea",
          description:
            "Durable, lightweight aluminum cases in silver, space gray, gold, and rose gold. Sport Band in a variety of colors. All the features of the original Apple Watch, plus a new dual-core processor for faster performance. All models run watchOS 3. Requires an iPhone 5 or later.",
          createdAt: "2019/6/13 23:20:10"
        }
      ]
    };
  },
  components: {
    ItemListView
  },

  methods: {
    // TAB 1
    removeItemFromCart(item) {
      const index = cartItems.findIndex(i => i.objectID == item.objectID);
      cartItems.splice(index, 1);
    },
    wishListButtonClicked(item) {
      // Toggle in Wish List
      if (this.isInWishList(item.objectID))
        this.$router.push("/apps/eCommerce/wish-list");
      else {
        this.toggleItemInWishList(item);
        this.removeItemFromCart(item);
      }
    },
    toggleItemInWishList(item) {
      this.$store.dispatch("eCommerce/toggleItemInWishList", item);
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("eCommerce/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
    },

    // TAB 2
    submitNewAddressForm() {
      return new Promise(() => {
        this.$validator.validateAll("add-new-address").then(result => {
          if (result) {
            // if form have no errors
            this.$refs.checkoutWizard.nextTab();
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please enter valid details",
              color: "warning",
              iconPack: "feather",
              icon: "icon-alert-circle"
            });
          }
        });
      });
    },

    // TAB 3
    makePayment() {
      return new Promise(() => {
        this.$validator.validateAll("cvv-form").then(result => {
          if (result) {
            // if form have no errors
            this.$vs.notify({
              title: "Success",
              text: "Payment received successfully",
              color: "success",
              iconPack: "feather",
              icon: "icon-check"
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please enter valid details",
              color: "warning",
              iconPack: "feather",
              icon: "icon-alert-circle"
            });
          }
        });
      });
    }
  }
};
</script>
