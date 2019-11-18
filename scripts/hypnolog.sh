
# curl example:
# curl -H "Content-Type: application/json" -X POST -d '{ "data": "Hello Hypnolog from cURL!", "type": "string" }' http://127.0.0.1:7000/logger/in

# usage exmaple:
# echo "Hello using bash pipe" | hl
function hl {
    local input=$(</dev/stdin)
    local json=$( jq -n \
        --arg data $input \
        --arg type string \
        '{data: $data, type: $type}' )
    curl -H "Content-Type: application/json" -X POST -s -o /dev/null --data-binary $json "http://127.0.0.1:7000/logger/in"
}


