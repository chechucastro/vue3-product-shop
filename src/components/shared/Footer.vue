<template>
  <footer>
    <!-- Footer main -->
    <section class="ft-main">
      <div class="ft-main__item">
        <h2 class="ft-title">Contact Us</h2>
        <ul>
          <li>
            <font-awesome-icon :icon="['fa', 'location-dot']" />
            <a href="#">3191 Ethels Spring Lake (Highlands), Florida NY</a>
          </li>
          <li>
            <font-awesome-icon :icon="['fa', 'phone']" /><a href="#"
              >919-485-0891</a
            >
          </li>
          <li>
            <font-awesome-icon :icon="['fa', 'envelope']" /><a href="#"
              >gokoping@hotmail.com</a
            >
          </li>
        </ul>
      </div>
      <div class="ft-main__item">
        <h2 class="ft-title">Quick Links</h2>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">My Account</a></li>
          <li><a href="#">Delivery</a></li>
          <li><a href="#">Policies</a></li>
        </ul>
      </div>
      <div class="ft-main__item">
        <h2 class="ft-title">Customer Care</h2>
        <ul>
          <li><a href="#">Size Chart</a></li>
          <li><a href="#">Gift Vouchers</a></li>
          <li><a href="#">Site Map</a></li>
          <li><a href="#">Media</a></li>
          <li><a href="#">Brand</a></li>
        </ul>
      </div>
      <div class="ft-main__item">
        <h2 class="ft-title">Newsletter</h2>
        <form>
          <input type="email" name="email" placeholder="Type Your Email" />
          <input type="submit" value="Subscribe" />
        </form>
      </div>
    </section>
  </footer>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '@/assets/scss/shared/footer.scss';
</style>
