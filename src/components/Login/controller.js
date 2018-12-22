import firebase from 'firebase'
import swal from 'sweetalert2'

export const authenticateUser = (email, password) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(response =>
			swal({
				title: 'Logged In',
				text: 'verifying..',
				type: 'success',
				timer: 2000,
				showConfirmButton: false,
				showCancelButton: false
			})
		)
}
