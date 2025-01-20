let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadButton = document.getElementById("download");

function generateQR() {

    if(qrText.value.length > 0) {
        
        qrImage.src = " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;

         imgBox.classList.add("show-img");

    }

    else {
        qrText.classList.add('error');
        setTimeout(()=>{
            qrText.classList.remove('error');
        }, 1000);
    }
    
}

// Download QR Code using axios
downloadButton.addEventListener("click", () => {
    if (qrImage.src) {
        // Use axios to fetch the image as a blob
        axios({
            url: qrImage.src,  // The URL of the generated QR code image
            method: 'GET',
            responseType: 'blob' // We expect a blob response
        })
        .then((response) => {
            if (response.status === 200) {
                // Create an object URL from the blob
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Create a temporary link element to trigger download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'qrcode.png'); // Specify the file name
                document.body.appendChild(link);
                link.click();  // Trigger the download
                document.body.removeChild(link);

                // Clean up the URL object to avoid memory leaks
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Error: Received non-200 status code');
            }
        })
        .catch((error) => {
            console.error('Error downloading the image:', error);
        });
    } else {
        alert("Please generate a QR code first.");
    }
});
