conversation_store = {}


def get_history(session_id: str):

    if session_id not in conversation_store:
        conversation_store[session_id] = []

    return conversation_store[session_id]


def add_message(session_id: str, role: str, content: str):

    history = get_history(session_id)

    history.append(
        {
            "role": role,
            "content": content
        }
    )

    return history