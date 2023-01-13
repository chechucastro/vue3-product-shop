<template>
  <div class="row product" itemscope itemtype="https://schema.org/Product">
    <!-- Product carousel -->
    <div class="col-sm-5 offset-sm-2 product__carousel">
      <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="true"
        v-model="currentSlide"
      >
        <Slide v-for="slide in product.attachments" :key="slide">
          <div class="carousel__item">
            <img :src="slide.attachmentAssetPath" :alt="slide.identifier" />
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <Carousel
        id="thumbnails"
        :items-to-show="3"
        :wrap-around="true"
        v-model="currentSlide"
        ref="carousel"
      >
        <Slide v-for="(slide, index) in product.attachments" :key="index">
          <div class="carousel__item" @click="slideTo(index)">
            <img :src="slide.attachmentAssetPath" :alt="slide.identifier" />
          </div>
        </Slide>
      </Carousel>
    </div>
    <!-- Product Properties -->
    <div class="col-sm-5 product__desc">
      <h4 itemprop="name">
        {{ product.productName }}
      </h4>
      <!-- product__reviews -->
      <div
        itemprop="aggregateRating"
        itemscope
        itemtype="https://schema.org/AggregateRating"
        class="product__reviews"
      >
        <vue3starRatings
          v-model="rating"
          starColor="#ffd800"
          starSize="14"
          step="1"
          :showControl="false"
        />
        <span itemprop="ratingValue" class="hide">{{ rating }}</span>
        <span class="product__readReviews"> &nbsp - Read reviews</span>
        <span itemprop="reviewCount" class="product__reviewCount">
          &nbsp (02) | &nbsp</span
        >
        <span class="product__writeReview"> Write review </span>
      </div>
      <!-- Product Offer-->
      <div
        itemprop="offers"
        itemscope
        itemtype="https://schema.org/Offer"
        class="product__offer"
      >
        <span itemprop="priceCurrency" class="product__currency" content="USD"
          >$</span
        ><span itemprop="price" class="product__price" content="159.00"
          >159.00</span
        >
      </div>
      <!-- Product description -->
      <div itemprop="description" class="product__description">
        {{ product.productLongDesc }}
      </div>
      <hr />
      <div class="product__actions">
        <div class="product__actions--colors">
          <span class="product__actions--title">Color</span>
          <span
            v-for="color in product.otherVariants"
            :key="color"
            class="colorPicker"
            :class="{ selected: color.selected }"
            :style="{ backgroundColor: color.hexCode }"
            @click="setVariantColor(color)"
          ></span>
        </div>
        <div class="product__actions--sizes">
          <label class="product__actions--title" for="size-select">Size</label>
          <!-- Size values -->
          <select name="size" id="size-select" v-model="productSize">
            <option
              v-for="size in product.sizeCodes"
              :value="size.value"
              :key="size.value"
            >
              {{ size.value }}
            </option>
          </select>
        </div>
      </div>
      <div class="product__addings">
        <div class="product__addings--addSubstract">
          <input
            role="button"
            type="button"
            value="-"
            class="button-minus"
            @click="increaseDecreaseItem(false)"
          />
          <input
            type="number"
            max="10"
            min="0"
            v-model="productQty"
            name="quantity"
            class="quantity-field"
          />
          <input
            role="button"
            type="button"
            value="+"
            class="button-plus"
            @click="increaseDecreaseItem(true)"
          />
        </div>
        <link itemprop="availability" href="https://schema.org/InStock" />
        <InStock />
      </div>
      <hr />
      <div class="product__sku">
        <div class="col-xs-6"><span class="product__sku--desc">Sku</span></div>
        <div><span class="product__category--value">M107-B</span></div>
      </div>
      <div class="product__category">
        <div class="col-xs-6">
          <span class="product__category--desc">Category</span>
        </div>
        <div><span class="product__category--value">Women/ T- Shirt</span></div>
      </div>
      <div class="product__cta">
        <div class="product__cta--addToCart">
          <!-- Add to cart button -->
          <AddToCart
            btnText="Add to cart"
            :btnIsDisabled="addToCartEnablerBtn"
            @click="addToCart()"
          />
        </div>
        <div class="product__cta--addToFavs">
          <FavoriteHearth />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * Imports
 **/
import { computed, onMounted, ref } from 'vue'
import InStock from '@/components/atomic/inStock.vue'
import AddToCart from '@/components/atomic/ctaButton.vue'
import FavoriteHearth from '@/components/atomic/favoriteHearth.vue'
import { useCartStore } from '@/stores/cart'

/**
 * Models
 **/

const cart = useCartStore() // Store
const productQty = ref(0),
  productSize = ref(null),
  currentSelectedProduct = ref(null),
  product = ref({})

/**
 * Methods
 **/

/**
 * Increase & decrease quantities (arrows)
 **/
const increaseDecreaseItem = (mode) => {
  const prdQty = productQty.value
  mode
    ? prdQty < 9 // Could be any max number
      ? productQty.value++
      : false
    : prdQty > 0
    ? productQty.value--
    : false
}

/**
 * Get catalog from a local json file
 * instead of having a call to an external api
 **/
const getCatalog = () => {
  fetch('/product.json')
    .then((r) => r.json())
    .then(
      (json) => {
        product.value = json.data[0].catalogEntryView[0]
        // TODO: Select first variant by default.... Ask question here ?
        product.value.otherVariants[0].selected = true
        currentSelectedProduct.value = product.value.otherVariants[0]
      },
      (response) => {
        console.log('Error loading json:', response)
      }
    )
}

/**
 * Set variant color
 **/
const setVariantColor = (color) => {
  // Set to false any previous selected color
  product.value.otherVariants.map((color) => {
    color.selected = false
  })
  // Select current clicked color
  color.selected = true
  // Select current product by color
  currentSelectedProduct.value = color
}

/**
 * Add to cart (Store)
 **/
const addToCart = () => {
  const product = {
    product: currentSelectedProduct.value,
    qty: productQty.value,
    size: productSize.value
  }
  cart.addItem(product)
}

/**
 * Computed to recalculate the button disable/enable status
 **/
const addToCartEnablerBtn = computed(() => {
  return !(productQty.value && productSize.value)
})

/**
 * Get catalog
 **/
onMounted(() => {
  getCatalog()
})
</script>
<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import vue3starRatings from 'vue3-star-ratings'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
    vue3starRatings
  },
  data: () => ({
    currentSlide: 0,
    rating: 3.5
  }),
  methods: {
    slideTo(val) {
      this.currentSlide = val
    }
  }
})
</script>
<style lang="scss">
@import '@/assets/scss/productDetails/productDetails.scss';
</style>
