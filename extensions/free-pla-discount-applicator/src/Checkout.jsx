import {
  reactExtension,
  useDiscountCodes,
  useApplyAttributeChange,
  useAttributes
} from "@shopify/ui-extensions-react/checkout";
import { useEffect } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const codes = useDiscountCodes();
  const attributes = useAttributes();
  const applyAttributeChange = useApplyAttributeChange();

  useEffect(() => {
    const value = codes.find((code) => code.code.includes("FREEPLA-"))
      ? "true"
      : "false";

    if (!attributes.find((attribute) => attribute.key === "free-pla-discount" && attribute.value == value)) {
      applyAttributeChange({
        key: "free-pla-discount",
        type: "updateAttribute",
        value: codes.find((code) => code.code.includes("FREEPLA-"))
          ? "true"
          : "false"
      })
    }
  }, [codes])

  return (
    <></>
  );
}