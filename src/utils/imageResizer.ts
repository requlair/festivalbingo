class Resizer {
  static changeHeightWidth(
    height: number,
    maxHeight: number,
    width: number,
    maxWidth: number,
    minWidth?: number,
    minHeight?: number
  ) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
    if (minWidth && width < minWidth) {
      height = Math.round((height * minWidth) / width);
      width = minWidth;
    }
    if (minHeight && height < minHeight) {
      width = Math.round((width * minHeight) / height);
      height = minHeight;
    }
    return { height, width };
  }

  static resizeImage(
    image: HTMLImageElement,
    maxWidth: number,
    maxHeight: number,
    minWidth?: number,
    minHeight?: number,
    compressFormat = "jpeg",
    quality = 100
  ) {
    const qualityDecimal = quality / 100;
    const canvas = document.createElement("canvas");

    let width = image.width;
    let height = image.height;

    const newHeightWidth = this.changeHeightWidth(
      height,
      maxHeight,
      width,
      maxWidth,
      minWidth,
      minHeight
    );
    canvas.width = newHeightWidth.width;
    canvas.height = newHeightWidth.height;

    width = newHeightWidth.width;
    height = newHeightWidth.height;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, width, height);

    if (ctx.imageSmoothingEnabled && ctx.imageSmoothingQuality) {
      ctx.imageSmoothingQuality = "high";
    }

    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
  }

  static b64toByteArrays(b64Data: string, contentType: string) {
    contentType = contentType || "image/jpeg";
    const sliceSize = 512;

    const byteCharacters = atob(
      b64Data.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "")
    );
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return byteArrays;
  }
  static b64toBlob(b64Data: string, contentType: string) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static b64toFile(b64Data: string, fileName: string, contentType: string) {
    const byteArrays = this.b64toByteArrays(b64Data, contentType);
    const file = new File(byteArrays, fileName, { type: contentType });
    return file;
  }

  static createResizedImage(
    file: Blob,
    maxWidth: number,
    maxHeight: number,
    compressFormat: string,
    quality: number,
    responseUriFunc: (
      value: string | Blob | File | ProgressEvent<FileReader>
    ) => void,
    outputType?: string,
    minWidth?: number,
    minHeight?: number
  ) {
    const reader = new FileReader();
    if (file) {
      if (file.type && !file.type.includes("image")) {
        throw Error("File Is NOT Image!");
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = function () {
            var resizedDataUrl = Resizer.resizeImage(
              image,
              maxWidth,
              maxHeight,
              minWidth,
              minHeight,
              compressFormat,
              quality
            );
            const contentType = `image/${compressFormat}`;
            switch (outputType) {
              case "blob":
                const blob = Resizer.b64toBlob(resizedDataUrl, contentType);
                responseUriFunc(blob);
                break;
              case "base64":
                responseUriFunc(resizedDataUrl);
                break;
              case "file":
                let fileName = file.name;
                let fileNameWithoutFormat = fileName
                  .toString()
                  .replace(/(png|jpeg|jpg|webp)$/i, "");
                let newFileName = fileNameWithoutFormat.concat(
                  compressFormat.toString()
                );
                const newFile = Resizer.b64toFile(
                  resizedDataUrl,
                  newFileName,
                  contentType
                );
                responseUriFunc(newFile);
                break;
              default:
                responseUriFunc(resizedDataUrl);
            }
          };
        };
        reader.onerror = (error) => {
          throw Error();
        };
      }
    } else {
      throw Error("File Not Found!");
    }
  }
}
export default {
  imageFileResizer: (
    file: Blob,
    maxWidth: number,
    maxHeight: number,
    compressFormat: string,
    quality: number,
    responseUriFunc: (
      value: string | Blob | File | ProgressEvent<FileReader>
    ) => void,
    outputType?: string,
    minWidth?: number,
    minHeight?: number
  ) => {
    return Resizer.createResizedImage(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      responseUriFunc,
      outputType,
      minWidth,
      minHeight
    );
  },
};
