import React from 'react'
import "../Styles/BookStyle.css";

function Book() {
    return (
        <div>
            <div className="imgLoader" />
            <div className="book-container">
                {/* <h1 className="title">
                    Turning pages<br />with css
                </h1>
                <div className="credit">
                    * Images loaded randomly from Picsum.photos
                </div> */}
                <div className="book">
                    <div className="gap" />
                    <div className="pages">
                        <div className="page" />
                        <div className="page" />
                        <div className="page" />
                        <div className="page" />
                        <div className="page" />
                        <div className="page" />
                    </div>
                    <div className="flips">
                        <div className="flip flip1">
                            <div className="flip flip2">
                                <div className="flip flip3">
                                    <div className="flip flip4">
                                        <div className="flip flip5">
                                            <div className="flip flip6">
                                                <div className="flip flip7" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book 