import { useState, useRef } from "react"
import "./room.css"
import { ChatApp } from "../../component/chatpage";
export default function Message() {

const [room, setRoom] = useState(null)

const roomInputRef = useRef(null)

return (
<div>
    { room ? (
    <div> <ChatApp room={room} /></div>
    ) : (
<div className="room">
<label>enter room name:</label>
<input ref={roomInputRef} />
    <button onClick={() => setRoom(roomInputRef.current.value)}>
    enter chat
    </button>
</div>
    )
}
</div>
);
}


