import "../Styles/LoaderStyle.css";

function Loader() {
    return (
        <>
            <div className="loader-container">
                <svg id="loading" viewBox="0 0 100 80">
                    {/* 100 x 80 viewport because we are missing the bottom center rectangle */}
                    {/* (100 / sqrt(2 * 30^2)) == 0.707. Used pythagorean principle to scale the rectangles to fit within a 100x100 viewport */}
                    <g transform="translate(50 0) scale(0.707 0.707) rotate(45 0 0)">
                        <rect className="rect" id="rect1" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="red" />
                        <rect className="rect" id="rect2" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="green" />
                        <rect className="rect" id="rect3" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="blue" />
                        <rect className="rect" id="rect4" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="black" />
                        <rect className="rect" id="rect5" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="orange" />
                        <rect className="rect" id="rect6" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="teal" />
                        <rect className="rect" id="rect7" x={0} y={0} width={30} height={30} rx={2} ry={2} fill="gold" />
                    </g>
                </svg>
                <span style={{"color": "whitesmoke", "marginTop": "1rem"}}>Loading....</span>
            </div>
        </>
    )
}

export default Loader