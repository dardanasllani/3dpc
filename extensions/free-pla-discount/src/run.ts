import type {
  RunInput,
  FunctionRunResult,
  Target,
  ProductVariant,
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input: RunInput): FunctionRunResult {
  const targets: Target[] = input.cart.lines
    .filter(line => (line.merchandise as ProductVariant).product.hasAnyTag)
    .map(line => ({
      productVariant: {
        id: (line.merchandise as ProductVariant).id,
      }
    }));

  const DISCOUNTED_ITEMS: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        message: "Free PLA Filament for orders over $125",
        targets: targets,
        value: {
          fixedAmount: {
            amount: "25",
          },
        }
      },
    ],
  };

  return targets.length === 0 ? EMPTY_DISCOUNT : DISCOUNTED_ITEMS;
};