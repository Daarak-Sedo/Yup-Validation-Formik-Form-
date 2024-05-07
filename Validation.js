const yup = require("yup");

const schema = yup.object().shape({
  // Number, String, Any
  numberField: yup.number(),
  stringField: yup.string(),
  anyField: yup.mixed(),

  // Unknown(false): Not allow any other key
  unknownField: yup.object().shape({}).noUnknown(),

  // Show all error list
  name: yup.string().required("Name is required"),

  // Optional Field
  optionalField: yup.string().optional(),

  // Option Valid
  optionField: yup.string().oneOf(["option1", "option2", "option3"]),

  // Min or Max
  age: yup
    .number()
    .min(18, "Must be at least 18 years")
    .max(100, "Age must be less than 100"),

  // Use When
  isAdmin: yup.boolean(),
  adminEmail: yup.string().when("isAdmin", {
    is: true,
    then: yup
      .string()
      .email("Invalid email for admin")
      .required("Email is required for admin"),
    otherwise: yup.string().email("Invalid email").optional(),
  }),

  // Object
  address: yup.object().shape({
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
  }),

  // Array
  tags: yup.array().of(yup.string().required("Tag is required")),

  //items
  item: yup.object().shape({
    id: yup.number().required(),
    name: yup.string.optional(),
  }),

  // object inside mapped array
  item: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
    })
  ),

  // Regex
  code: yup.string().matches(/^ABC\d{3}$/, "Invalid code format"),

  // Ref
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  // Email Validation
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  // XOR
  xorField: yup
    .object()
    .shape({
      option1: yup.string(),
      option2: yup.string(),
    })
    .test("xor", "Only one option is allowed", function (value) {
      const { option1, option2 } = value || {};
      return !(option1 && option2) && (option1 || option2);
    }),

  // Custom Validation
  customField: yup
    .string()
    .test("custom", 'Field must start with "ABC"', function (value) {
      if (!value) return true;
      return value.startsWith("ABC");
    }),
});

module.exports = schema;
