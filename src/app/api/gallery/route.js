import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../libs/mongoose";
import Gallery from "../../../../models/gallery";
import { json } from "stream/consumers";

// export async function POST(request) {
//     try {
//       await connectionToDatabase();
//       const formData = await request.formData();
//       const header = formData.get("header");
//       const description = formData.get("description");
//       const mainimage = formData.get("mainimage");
//       const otherimages = formData.getAll("otherimages");
  
//       const newGallery = new Gallery({ header, description, mainimage, otherimages });
//       await newGallery.save();
  
//       return NextResponse.json(newGallery, { status: 201 });
//     } catch (error) {
//       return NextResponse.json({ message: "An error occurred" }, { status: 500 });
//     }
//   }


// export const POST = async (request) => {
//   try {
//       await connectionToDatabase();
      
//       const data = await request.formData();
//       const header = data.get("header");
//       const description = data.get("description");
//       const file = data.get("file");
//       console.log(data);
//       if(!file){
//           return NextResponse.json({message: "Please upload a file", success:false});
//       }
      
//       const bufferData = await file.arrayBuffer();
//       const buffer = Buffer.from(bufferData);
//       const newGallery = new Gallery({
//           header: header,
//           description: description,
//           image_name: file.name,
//           image_data: buffer,
//           image_type: file.type,
//       });
//       await newGallery.save();
//       return NextResponse.json({response: "News created successfully", success:true});
//   } catch (error) {
//       console.log(error);
//   }
// }


export const POST = async (request) => {
  try {
    await connectionToDatabase();
    
    const data = await request.formData();
    const header = data.get("header");
    const description = data.get("description");

    // Retrieve the main image and other images
    const mainImageFile = data.get("mainImage"); // Assume the main image field name is "mainImage"
    const otherImageFiles = data.getAll("otherImages"); // Assume other images field name is "otherImages"

    // Handle main image
    let mainImage = null;
    if (mainImageFile) {
      const bufferData = await mainImageFile.arrayBuffer();
      const buffer = Buffer.from(bufferData);
      mainImage = {
        image_name: mainImageFile.name,
        image_data: buffer,
        image_type: mainImageFile.type,
      };
    } else {
      return NextResponse.json({ message: "Please upload a main image", success: false });
    }

    // Process other images
    const otherImages = await Promise.all(otherImageFiles.map(async (file) => {
      const bufferData = await file.arrayBuffer();
      const buffer = Buffer.from(bufferData);
      return {
        image_name: file.name,
        image_data: buffer,
        image_type: file.type,
      };
    }));

    // Create a new gallery item with the main image and other images
    const newGallery = new Gallery({
      header: header,
      description: description,
      main_image: mainImage,
      other_images: otherImages,
    });

    await newGallery.save();
    return NextResponse.json({ response: "Gallery item created successfully", success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred", success: false });
  }
};


export async function GET(request){
    try {
        await connectionToDatabase();
        const gallery = await Gallery.find();
        return NextResponse.json(gallery);
    } catch (error) {
        return NextResponse(error);
    }
}


export async function DELETE(request, {params}){
  const id = request.nextUrl.searchParams.get("id");
  await connectionToDatabase();
  await Gallery.findByIdAndDelete(id);
  return NextResponse.json({message: "Gallery deleted successfully"}, {status: 201});
}