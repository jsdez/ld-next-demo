"use client";

import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import PriceFormatSale from "@/components/commerce-ui/price-format-sale";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import { Button } from "@/components/ui/button";

interface ProductCard_03Props {
  imageUrl?: string;
  tagText?: string;
  productName?: string;
  originalPrice?: number;
  discountPercentage?: number | null; // New: Discount as a percentage
  freeShipping?: boolean;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  currencyPrefix?: string;
}

function ProductCard_03({
  imageUrl = "",
  tagText = "",
  productName = "",
  originalPrice = 0,
  discountPercentage = null, // Default: No discount
  freeShipping = true,
  onAddToCart = () => {},
  onBuyNow = () => {},
  currencyPrefix = "£",
}: ProductCard_03Props = {}) {
  // Calculate the sale price if a discount is applied
  const salePrice =
    discountPercentage !== null
      ? Math.round(originalPrice * (1 - discountPercentage / 100)) // Apply discount and round
      : originalPrice;

  const isOnSale = discountPercentage !== null && discountPercentage > 0;

  return (
    <div className="flex w-[250px] flex-col rounded-lg border p-0">
      {/* Tag Text */}
      {tagText && (
        <div className="w-full rounded-tl-lg rounded-tr-lg bg-gray-500/50 p-2">
          <p className="text-center text-xs font-semibold">{tagText}</p>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full">
        <ImageViewer
          imageUrl={imageUrl}
          classNameThumbnailViewer="rounded-none"
        />
      </div>

      <div className="mt-2 flex flex-col gap-4 p-2">
        {/* Product Name */}
        <div>
          <p className="text-xl font-semibold">{productName}</p>
        </div>

        {/* Pricing Section */}
        <div>
          {isOnSale ? (
            <PriceFormatSale
              prefix={currencyPrefix}
              originalPrice={originalPrice}
              salePrice={salePrice}
              showSavePercentage
              className="text-xl font-semibold"
              classNameSalePrice="text-2xl text-orange-500"
            />
          ) : (
            <PriceFormat
              prefix={currencyPrefix}
              value={originalPrice}
              className="text-2xl font-semibold"
            />
          )}
          {freeShipping && (
            <p className="text-muted-foreground text-sm">Free Shipping</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-4">
          <Button variant="outline" onClick={onAddToCart}>
            Add to cart
          </Button>
          <Button onClick={onBuyNow}>Buy now</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard_03;
export type { ProductCard_03Props };
