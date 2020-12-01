$(document).ready(function() {
        $('.range_date').on('change',function(e) {
            var url = "/admin/get_range_stats"; // send the form data here.
            let start_date = $('#start_date').val()
            let end_date = $('#end_date').val()
            let dict = {'start_date': start_date, 'end_date': end_date}
            $.ajax({
                type: "get",
                url: url,
                data: dict, // serializes the form's elements.
                success: function (data) {
                    $('#range_stats').attr('src', 'data:image/png;base64,'+ data) // display the returned data in the console.
                }
            });
        });

        $('#pie_form').submit(function (e) {
            var url = "/admin/get_pie"; // send the form data here.
            $.ajax({
                type: "get",
                url: url,
                data: $(this).serialize(), // serializes the form's elements.
                success: function (data) {
                    $('#img_seats').attr('src', 'data:image/png;base64,'+ data)  // display the returned data in the console.
                }
            });
            e.preventDefault(); // block the traditional submission of the form.
        });

        $('#import_button').click(function (e) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = '/uploads/db.csv';
            // the filename you want
            a.download = 'db.csv';
            document.body.appendChild(a);
            a.click();
        })

        $('#import_file').change(function () {
            var form_data = new FormData();
            form_data.append('file', $(this).prop('files')[0])

            $.ajax({
                type: "post",
                url: '/import_db',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    console.log('Success!');
                },
            });
        })


    });