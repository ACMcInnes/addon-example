import Image from "next/image";

interface imageObject {
  URL: string;
  Timestamp: string;
  ThumbURL: string;
  MediumThumbURL: string;
  Name: string;
}

export default function Images({
  sku,
  images,
}: {
  sku: string;
  images: Array<imageObject>;
}) {
  let mainImage = images[0];
  let altImages = images.slice(1);

  // console.log(`IMAGES TEST`);
  // console.log(mainImage);
  // console.log(mainImage.URL);
  // console.log(altImages);

  return (
    <section className={altImages.length ? "grid gap-4 grid-cols-3 md:grid-cols-4 max-w-screen-xl mx-3" : "grid gap-4 grid-cols-3 mx-3"}>
      <div className={altImages.length ? "col-span-3 md:col-span-2 md:row-span-2" : "col-span-3"}>
        <Image
          src={mainImage ? mainImage.URL : "/am_logo.svg"}
          sizes={altImages.length ? "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 850px" : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 500px"}
          alt={`${sku} product image`}
          width={999}
          height={1500}
          className="max-w-screen-lg h-full w-full object-contain object-center"
          priority
        />
      </div>

      {altImages.map((alt, index) => (
        <div key={index} className={index ? "col-span-1" : "col-span-1 md:col-span-2 md:row-span-2"}>
          <Image
            src={alt ? alt.URL : "/am_logo.svg"}
            sizes={index ? "(max-width: 768px) 33vw, (max-width: 1280px) 16vw, 200px" : "(max-width: 1280px) 33vw, 500px"}
            alt={`${sku} product alt image`}
            width={999}
            height={1500}
            className="max-w-screen-lg h-full w-full object-contain object-center"
          />
        </div>
      ))}
    </section>
  );
}
