<?php


namespace App\Http\Traits;


trait CloudinaryTrait
{

    public function uploadPictureToCloudinary($base64image) {

        \Cloudinary::config(array(
            "cloud_name" => "themrangel",
            "api_key" => env("CLOUDINARY_API_KEY"),
            "api_secret" => env("CLOUDINARY_API_SECRET"),
            "secure" => false
        ));

        return \Cloudinary\Uploader::upload($base64image, array(
            "folder" => "labori"));

    }

}
