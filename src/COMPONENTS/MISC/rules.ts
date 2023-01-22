export const rules = {
  title: {
    required: {
      value: true,
      message: "The 'title' field is required",
    },
    maxLength: {
      value: 25,
      message: `Enter a title under 25 characters.`,
    },
  },
  content: {
    required: {
      value: true,
      message: "The 'content' field is required",
    },
    maxLength: {
      value: 150,
      message: `Enter a title under 150 characters.`,
    },
  },
  userSelect: {
    required: {
      value: true,
      message: "The 'user' field is required",
    },
  },
  username: {
    required: true,
    maxLength: {
      value: 30,
      message: "Enter a username under 30 characters.",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+$/i,
      message: "Enter a valid username.",
    },
  },
  email: {
    required: true,
    maxLength: {
      value: 40,
      message: "Enter an address under 40 characters.",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Enter a valid email.",
    },
  },
  commentBody: {
    required: true,
    maxLength: {
      value: 300,
      message: "Enter a message under 300 characters.",
    },
  },
  name: {
    required: true,
    maxLength: {
      value: 30,
      message: "Enter a name under 30 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž ]+$/i,
      message: "Enter a valid name.",
    },
  },
  phone: {
    required: true,
    maxLength: {
      value: 25,
      message: "Enter a valid phone number.",
    },
    pattern: {
      value: /^[0-9- ]+$/i,
      message: "Enter a valid phone number.",
    },
  },
  website: {
    required: false,
    maxLength: {
      value: 30,
      message: "Enter a valid website.",
    },
    pattern: {
      value: /^[A-z0-9.-_/ ]+$/i,
      message: "Enter a valid website.",
    },
  },
  street: {
    required: false,
    maxLength: {
      value: 40,
      message: "Enter a street name under 40 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž0-9 ]+$/i,
      message: "Enter a valid street name.",
    },
  },
  suite: {
    required: false,
    maxLength: {
      value: 40,
      message: "Enter a suite name under 40 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž.-0-9 ]+$/i,
      message: "Enter a valid suite name.",
    },
  },
  city: {
    required: false,
    maxLength: {
      value: 40,
      message: "Enter a city name under 40 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž]+$/i,
      message: "Enter a valid city name.",
    },
  },
  zip: {
    required: false,
    maxLength: {
      value: 15,
      message: "Enter a zipcode under 15 characters.",
    },
    pattern: {
      value: /^[0-9-]+$/i,
      message: "Enter a valid zipcode.",
    },
  },
  latitude: {
    required: false,
    maxLength: {
      value: 10,
      message: "Enter a valid latitude.",
    },
    pattern: {
      value: /^[-0-9.]+$/i,
      message: "Enter a valid latitude.",
    },
  },
  longitude: {
    required: false,
    maxLength: {
      value: 10,
      message: "Enter a valid longitude.",
    },
    pattern: {
      value: /^[-0-9.]+$/i,
      message: "Enter a valid longitude.",
    },
  },
  companyName: {
    required: false,
    maxLength: {
      value: 20,
      message: "Enter a company name under 20 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž ]+$/i,
      message: "Enter a valid company name.",
    },
  },
  catchphrase: {
    required: false,
    maxLength: {
      value: 50,
      message: "Enter a catchphrase under 50 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž -.!]+$/i,
      message: "Enter a valid catchphrase.",
    },
  },
  bs: {
    required: false,
    maxLength: {
      value: 50,
      message: "Enter a bs under 50 characters.",
    },
    pattern: {
      value: /^[A-zÀ-ž -.!]+$/i,
      message: "Enter a valid bs.",
    },
  },
};
