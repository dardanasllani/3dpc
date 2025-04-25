import {
  reactExtension,
  useDiscountCodes,
  useApplyDiscountCodeChange
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const codes = useDiscountCodes();
  const applyDiscountCodeChange = useApplyDiscountCodeChange();

  if (codes.find((code) => code.code.includes("FREEPLA-") && code.code !== "FREEPLA-DISCOUNT")) {
    applyDiscountCodeChange({
      code: "FREEPLA-DISCOUNT",
      type: "addDiscountCode",
    });
  } else if (codes.find((code) => code.code.includes("FREEPLA-"))) {
    applyDiscountCodeChange({
      code: "FREEPLA-DISCOUNT",
      type: "removeDiscountCode",
    });
  }

  return (
    <></>
  );
}