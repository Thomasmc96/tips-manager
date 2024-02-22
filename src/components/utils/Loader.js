import './Loader.css';
import loaderBall from '../../assets/graphic/football.svg'

const Loader = () => {
    return (
        <div id="ajaxloader">
            <div className="outer"></div>
            <div className="soccer">
                <img src={loaderBall} alt="loading..." />
            </div>
        </div>
    )
}
export default Loader;