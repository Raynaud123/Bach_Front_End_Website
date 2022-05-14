import React from "react";


export default function NotificationInfo_Promotor(props) {
    const promotor = props.promotor;
    const notification = props.notification;

    return(
        <div className={"showTopicInfo"}>
            <div className={"topicinfocontainer"}>
                {notification.object_name==="PROMOTOR"?
                    <div>
                        {notification.notification_msg==="APPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>You are approved :) !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                        {notification.notification_msg==="NOTAPPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>You are not approved :( !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                    </div>:<div/>
                }

                {notification.object_name==="TOPIC"?
                    <div>
                        {notification.notification_msg==="APPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>Your Thesis Topic is approved :) !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                        {notification.notification_msg==="NOTAPPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>Your Thesis Topic is not approved :( !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                    </div>:<div/>
                }
            </div>
        </div>
    )
}

