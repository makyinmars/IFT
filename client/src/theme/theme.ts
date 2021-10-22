import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: "brand.500",
        },
      },
    },
  },
};

const brandRing = {
  _focus: {
    ring: 2,
    ringColor: "brand.500",
  },
};

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#f2e5e7",
        100: "#d9b3b9",
        200: "#cd9aa1",
        300: "#c0818a",
        400: "#b46773",
        500: "#a74e5b",
        600: "#9b3544",
        700: "#8e1c2d",
        800: "#820316",
        900: "#41010b",
      },
    },
    fonts: {
      heading: `Noto Sans Mono, ${base.fonts?.heading}`,
      body: `Noto Sans Mono, ${base.fonts?.body}`,
    },
    components: {
      Button: {
        variants: {
          primary: (props: any) => ({
            ...brandRing,
            color: mode("white", "gray.800")(props),
            backgroundColor: mode("brand.100", "brand.400")(props),
            _hover: {
              backgroundColor: mode("brand.600", "brand.500")(props),
            },
            _active: {
              backgroundColor: mode("brand.700", "brand.600")(props),
            },
          }),
          secondary: (props: any) => ({
            ...brandRing,
            color: mode("white", "gray.800")(props),
            backgroundColor: mode("brand.200", "brand.500")(props),
            _hover: {
              backgroundColor: mode("brand.600", "brand.500")(props),
            },
            _active: {
              backgroundColor: mode("brand.700", "brand.600")(props),
            },
          }),
        },
      },
      Input: { ...inputSelectStyles },
      Select: { ...inputSelectStyles },
      Checkbox: {
        baseStyle: {
          control: {
            ...brandRing,
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Checkbox"],
  }),
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);

export default theme;
