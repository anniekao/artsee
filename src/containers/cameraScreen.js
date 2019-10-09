import { connect } from 'react-redux'
import { addArt } from '../actions'
import CameraScreen from '../Components/CameraScreen'

const mapStateToProps = (state) => ({
  user: state.users.user
})

const mapDispatchToProps = dispatch => ({
  addArt: art => dispatch(addArt(art))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)