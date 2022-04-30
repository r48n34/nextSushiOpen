import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

function callLoadingSwal(){

    MySwal.fire({
        title: 'Loading',
        html: 'Fetching data, please wait...',
        timerProgressBar: true,
        allowEscapeKey: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        didOpen: () => {
            MySwal.showLoading()
        }
    })

}

function closeSwal(){
    MySwal.close()
}

export { callLoadingSwal , closeSwal }