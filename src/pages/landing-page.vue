<template>
  <section class="landing-page">
    <header class="home-header align-center">
      <section class="home-nav">
        <div class="logo-section">
        <img class="logo-img" :src="require(`@/pics/favicon-32x32.png`)" />
        <div class="logo-home">tasker.com</div>
        </div>
        <!-- <div id="toggle" class="action-btn" @click="toggleMenu">
            <span class="fa fa-bars"></span>
          </div> -->
        <div class="extra-info">
          <router-link to="/"
            >Product<i class="fas fa-chevron-down"></i
          ></router-link>
          <router-link to="/about"
            >Solutions<i class="fas fa-chevron-down"></i
          ></router-link>
          <router-link to="/home">Templates</router-link>
          <router-link to="/home">Pricing</router-link>
        </div>
      </section>
      <div class="action-btn">
        <router-link to="/login">Login</router-link>
        <router-link class="get-started" to="/home"> Get Started</router-link>
      </div>
    </header>
    <section class="info-section">
      <section class="info-header">
        <h1 class="info-heading">Work Without Limits</h1>
        <h5 class="opening-para">
          Easily build, run, and scale your dream workflows on one platform.
          What would you like to manage with tasker.com Work OS?
        </h5>
      </section>
      <div class="icons">
        <div>
          <span><i class="fas fa-stream"></i>Project Management</span>
          <span><i class="fas fa-chart-line"></i>Scales and CRM</span>
          <span><i class="fas fa-bullhorn"></i>Marketing</span>
          <span><i class="fas fa-shapes"></i>Creative and design</span>
        </div>
        <div>
          <span><i class="fas fa-code"></i>Software development</span>
          <span><i class="fas fa-check"></i>Task management</span>
          <span><i class="fas fa-cog"></i>Operations</span>
          <span><i class="far fa-user"></i>HR and recruitment</span
          ><span><i class="fas fa-sliders-h"></i>IT</span>
        </div>
        <span><i class="fas fa-dot-circle"></i>200+ workflows</span>
      </div>
      <el-input value="Enter your work email"></el-input>
      <router-link class="get-started-in" to="/board">
        Get Started<i class="fas fa-chevron-right"></i
      ></router-link>
      <img class="main-img" :src="require(`@/pics/picture1.jpeg`)" />
      <section class="more-info first-p">
        <img class="full-board-img" :src="require(`@/pics/picture2.png`)" />
        <div class="txt">
          <h3>Manage everything in one workspace</h3>
          <p>
            Planning, tracking and delivering your team's best work has never
            been easier
          </p>
          <img class="small-board-img" :src="require(`@/pics/picture2.png`)" />
        </div>
      </section>
      <section class="more-info">
        <div class="txt">
          <h3>Visualize work with Views</h3>
          <p>View data as a kanban, danban, dashboard and more</p>
        </div>
        <img :src="require(`@/pics/picture3.png`)" />
      </section>
      <section class="more-info">
        <div class="imgs">
          <img
            class="phone-pic full-board-img"
            :src="require(`@/pics/picture6.jpg`)"
          />
          <img
            class="phone-pic full-board-img"
            :src="require(`@/pics/picture7.jpg`)"
          />
        </div>
        <div class="txt">
          <h3>Setup in minutes</h3>
          <p>
            Get started fast with hundreds of visual and cutomizable templated -
            or creat your own even from your phone
          </p>
          <img
            class="phone-pic small-board-img"
            :src="require(`@/pics/picture6.jpg`)"
          />
          <img
            class="phone-pic small-board-img"
            :src="require(`@/pics/picture7.jpg`)"
          />
        </div>
      </section>
      <section class="trial">
        <h3>Try Tasker for your team</h3>
        <h5>14-day free trial | No credit card needed</h5>
        <el-input value="Enter your work email"></el-input>
        <router-link to="/home"
          >Get Started<i class="fas fa-chevron-right"></i
        ></router-link>
      </section>
      <section class="links">
        <div class="about-us">
          <a>About Us</a>
          <a>Become a partner</a>
          <a>Careers</a>
          <a>Blog</a>
          <a>Pricing</a>
          <a>Contact sales</a>
          <a>Terms and privacy</a>
          <a>Product overview</a>
          <a>Investor relations</a>
        </div>
        <div class="general">
          <a><i class="fas fa-universal-access"></i>Accessibility statement</a>
          <a
            ><i class="fas fa-globe"></i>Contact us<i
              class="fas fa-chevron-down"
            ></i
          ></a>
        </div>
      </section>
      <footer>
        <h1 class="logo">Tasker</h1>
        <p>All Rights Reserved <i class="far fa-copyright"></i> tasket.com</p>
        <div class="social-contact">
          <i class="fab fa-twitter"></i>
          <i class="fab fa-linkedin-in"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-youtube"></i>
          <i class="fab fa-instagram"></i>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      document.body.classList.toggle("menu-open");
    },
  },
};
</script>