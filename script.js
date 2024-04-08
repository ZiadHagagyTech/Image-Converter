function convertImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const outputImage = document.getElementById('outputImage');
            const formatSelect = document.getElementById('format');
            const format = formatSelect.value;
            const filename = `converted_image.${format}`;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const dataURL = canvas.toDataURL(`image/${format}`);
                outputImage.src = dataURL;

                const downloadButton = document.getElementById('downloadButton');
                downloadButton.setAttribute('download', filename);
                downloadButton.setAttribute('href', dataURL);
                downloadButton.style.display = 'block';

                // إعادة تحديد القيمة الافتراضية لقائمة السحب
                formatSelect.value = 'png';

                // مسح الصورة
                input.value = ''; // مسح قيمة الملف المحمل
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// دالة لمسح الصورة
function clearImage() {
    const outputImage = document.getElementById('outputImage');
    const downloadButton = document.getElementById('downloadButton');
    const formatSelect = document.getElementById('format');
    const input = document.querySelector('input[type="file"]');

    outputImage.src = ''; // مسح الصورة
    downloadButton.style.display = 'none'; // إخفاء زر التحميل
    formatSelect.value = 'png'; // إعادة تحديد القيمة الافتراضية لقائمة السحب
    input.value = ''; // مسح قيمة الملف المحمل
}