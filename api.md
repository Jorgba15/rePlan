Schema:
{users:{ "type":"array" "items":[ {"username":{"type":"text"}, "password":{"type":"text"} }]}
}
{lists:{ "type":"array" "items":[ {"id": {"type:""int"}, "username": {"type":"text"}, "description": {"type":"text"}, "listname": {"type":"text"} }]}
}
{tasks: {"type":"array" "items": [ {"done": {"type":"boolean"}, "task_id":{"type":"int"}, "deadline":{"type":"timestamp"}, "tag": {"type":"text"} }]}
}
