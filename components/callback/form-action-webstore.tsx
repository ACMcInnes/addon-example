"use server"

export async function getWebstore(
  prevState: {
    message: string;
    webstore: string;
  },
  formData: FormData
) {
    const webstore = formData.get("webstore") ?? "";
    if (webstore) {
        return {
            message: `Webstore provided: ${webstore}`,
            webstore: `${webstore}`
        };
        
    } else {
        return {
            message: "URL not a valid webstore",
            webstore: ""
        };
    }

  /*  
  try {
    const webstore = formData.get("webstore") ?? "";

    let checkUrl;
    checkUrl = new URL(webstore);
    return { message: `Webstore provided: ${checkUrl}` };
  } catch (e) {
    return { message: "URL not a valid webstore" };
  }
  */
}
