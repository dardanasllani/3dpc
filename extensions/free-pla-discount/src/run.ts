import type {
  RunInput,
  FunctionRunResult,
  Target,
  ProductVariant,
  Attribute,
  MoneyV2,
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input: RunInput): FunctionRunResult {
  const hasAttribute: boolean = (input.cart.attribute as Attribute)?.value === 'true';

  const taggedLines = input.cart.lines.filter(
    (line) => (line.merchandise as ProductVariant).product.inAnyCollection
  );

  console.log(JSON.stringify(taggedLines), "ASDASDASDasd")
  
  const cheapestLine = taggedLines.reduce((lowest, line) => {
    const currentAmount = parseFloat((line.cost.amountPerQuantity as MoneyV2).amount);
    if (!lowest) return line;
  
    const lowestAmount = parseFloat((lowest.cost.amountPerQuantity as MoneyV2).amount);
    return currentAmount < lowestAmount ? line : lowest;
  }, null as typeof taggedLines[0] | null);

  const targets: Target[] = cheapestLine
  ? [{
      productVariant: {
        id: (cheapestLine.merchandise as ProductVariant).id,
      }
    }]
  : [];

  const DISCOUNTED_ITEMS: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        message: "Free PLA Filament",
        targets: targets,
        value: {
          percentage: {
            value: "100",
          },
        }
      },
    ],
  };

  if (hasAttribute && taggedLines.length > 0) {
    return DISCOUNTED_ITEMS;
  }

  return EMPTY_DISCOUNT;
};