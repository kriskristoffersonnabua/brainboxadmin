import firebase from 'firebase'
import swal from 'sweetalert2'

export const authenticateUser = (email, password) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then(response => swal('Logged In', 'verifying..', 'successJ'))
}
