const mongoose = require("mongoose");
const { appConfig } = require("../../config.js");

const placeSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  name: {
    type: String,
  },
  dflt_lang: {
    type: String,
  },
  theme: {
    type: String,
  },
  type: {
    type: String,
  },
  navbar_web: [
    {
      title: {
        type: Object,
      },
      icon: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
  navbar_menu: [
    {
      icon: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
  home: {
    background_color: {
      type: String,
    },
    background_img: {
      type: String,
    },
  },
  about_us: {
    title: {
      type: Object,
    },
    text: {
      type: Object,
    },
    background_color: {
      type: String,
    },
    background_img: {
      type: String,
    },
  },
  contact_us: {
    title: {
      type: Object,
    },
    text: {
      type: Object,
    },
    address_title: {
      type: Object,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    open_hours_title: {
      type: Object,
    },
    open_hours: {
      type: Object,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    web: {
      type: String,
    },
  },
  customs: [
    {
      title: {
        type: Object,
      },
      slider_imgs: {
        type: Array,
      },
      text: {
        type: Object,
      },
      menu: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  users_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

placeSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.logo = `${host}:${port}/public/${filename}`;
};

placeSchema.methods.setIconNweb = function setIconNweb(filename) {
  const { host, port } = appConfig;
  this.navbar_web.icon = `${host}:${port}/public/${filename}`;
};

placeSchema.methods.setIconNmenu = function setIconNmenu(filename) {
  const { host, port } = appConfig;
  this.navbar_menu.icon = `${host}:${port}/public/${filename}`;
};

placeSchema.methods.setBgImgHome = function setBgImgHome(filename) {
  const { host, port } = appConfig;
  this.home.background_img = `${host}:${port}/public/${filename}`;
};

placeSchema.methods.setBgImgAbout = function setBgImgAbout(filename) {
  const { host, port } = appConfig;
  this.about_us.background_img = `${host}:${port}/public/${filename}`;
};

placeSchema.methods.setImgCustom1 = function setImgCustom1(filename) {
  const { host, port } = appConfig;
  this.custom1.slider_imgs.push(`${host}:${port}/public/${filename}`);
};

placeSchema.methods.setImgCustom2 = function setImgCustom2(filename) {
  const { host, port } = appConfig;
  this.custom2.slider_imgs.push(`${host}:${port}/public/${filename}`);
};

module.exports = mongoose.model("Place", placeSchema);
