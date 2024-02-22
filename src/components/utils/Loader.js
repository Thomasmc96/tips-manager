import './Loader.css';
import ball from '../../assets/graphic/football.svg'

const Loader = () => {
    return (
        <div id="ajaxloader">
            <div className="outer"></div>
            <div className="soccer">
                <img src={ball} alt="loading..." />
            </div>
        </div>
    )
}
export default Loader;