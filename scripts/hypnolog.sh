# scripts for using Hypnolog
# ===========================

# log using curl
# curl example:
# curl -H "Content-Type: application/json" -X POST -d '{ "data": "Hello Hypnolog from cURL!", "type": "string" }' http://127.0.0.1:7000/logger/in

# log using piping to hypnolog
# echo "Hello using bash pipe" | hl [data_type] [tag_name]
# usage exmaple:
# echo "Hello using bash pipe" | hl
# echo "Hello using bash pipe" | hl string from_terminal
function hl {
    local input=$(</dev/stdin)
    local data_type=${1:-string}
    local tag=${2:-cli}
    local json=$( jq -n \
        --arg data $input \
        --arg type $data_type \
        --arg tag $tag \
        '{data: $data, type: $type, tags: [$tag]}' )
    curl -H "Content-Type: application/json" -X POST -s -o /dev/null --data-binary $json "http://127.0.0.1:7000/logger/in"
}

# same as hl but which loop
# usgae example:
# tail -f file.txt | hls
# tail -f file.txt | hls string from_file
hls(){
    local data_type=${1:-}
    local tag=${2:-}
    while read data; do
        $(echo $data | hl $data_type $tag)
    done
}

