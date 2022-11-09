const categoryProduct = [
    {
        type: "điện thoại",
        category: "dienthoai",
        detailFields: [
            {
                name: "screen",
                label: "màn hình",
            },
            {
                name: "os",
                label: "hệ điều hành",
            },
            {
                name: "camera_rear",
                label: "camera sau",
            },
            {
                name: "camera_front",
                label: "camera trước",
            },
            {
                name: "chip",
                label: "chip",
            },
            {
                name: "ram",
                label: "RAM",
            },
            {
                name: "storage_capacity",
                label: "dung lượng lưu trữ",
            },
            {
                name: "sim",
                label: "sim",
            },
            {
                name: "battery",
                label: "pin, sạc",
            },
        ],
    },
    {
        type: "laptop",
        category: "laptop",
        detailFields: [
            {
                name: "cpu",
                label: "CPU",
            },
            {
                name: "ram",
                label: "RAM",
            },
            {
                name: "hard_drive",
                label: "ổ cứng",
            },
            {
                name: "screen",
                label: "màn hình",
            },
            {
                name: "graphic_card",
                label: "card màn hình",
            },
            {
                name: "gate_connection",
                label: "cổng kết nối",
            },
            {
                name: "os",
                label: "hệ điều hành",
            },
            {
                name: "design",
                label: "thiết kế",
            },
            {
                name: "size_weight",
                label: "kích thước, khối lượng",
            },
            {
                name: "release_time",
                label: "thời điểm ra mắt",
            },
        ],
    },
    {
        type: "tablet",
        category: "tablet",
        detailFields: [
            {
                name: "screen",
                label: "màn hình",
            },
            {
                name: "os",
                label: "hệ điều hành",
            },
            {
                name: "chip",
                label: "chip",
            },
            {
                name: "ram",
                label: "RAM",
            },
            {
                name: "storage_capacity",
                label: "dung lượng lưu trữ",
            },
            {
                name: "connection",
                label: "kết nối",
            },
            {
                name: "sim",
                label: "sim",
            },
            {
                name: "camera_rear",
                label: "camera sau",
            },
            {
                name: "camera_front",
                label: "camera trước",
            },
            {
                name: "battery",
                label: "pin, sạc",
            },
        ],
    },
    {
        type: "đồng hồ",
        category: "dongho",
        detailFields: [
            {
                name: "subject",
                label: "đối tượng sử dụng",
            },
            {
                name: "diameter_face",
                label: "đường kính mặt",
            },
            {
                name: "material_glass",
                label: "chất liệu mặt kính",
            },
            {
                name: "material_wire",
                label: "chất liệu dây",
            },
            {
                name: "apparatus",
                label: "bộ máy",
            },
            {
                name: "waterproof",
                label: "chống nước",
            },
            {
                name: "trademark",
                label: "thương hiệu",
            },
            {
                name: "firm",
                label: "hãng",
            },
        ],
    },
    {
        type: "Sạc dự phòng",
        category: "phukien",
        detailFields: [
            {
                name: "unless",
                label: "hiệu suất sạc",
            },
            {
                name: "battery_capacity",
                label: "dung lượng pin",
            },
            {
                name: "battery_charge_time",
                label: "thời gian sạc đầy pin",
            },
            {
                name: "input",
                label: "nguồn vào",
            },
            {
                name: "output",
                label: "nguồn ra",
            },
            {
                name: "technology",
                label: "công nghệ / tiện ích",
            },
            {
                name: "size",
                label: "kích thước",
            },
            {
                name: "weight",
                label: "trọng lượng",
            },
            {
                name: "trademark",
                label: "thương hiệu",
            },
            {
                name: "made_in",
                label: "sản xuất tại",
            },
            {
                name: "firm",
                label: "hãng",
            },
        ],
    },
    {
        type: "Tai nghe",
        category: "phukien",
        detailFields: [
            {
                name: "earphone_time",
                label: "thời gian tai nghe",
            },
            {
                name: "charging_box_time",
                label: "thời gian hộp sạc",
            },
            {
                name: "charging_port",
                label: "cổng sạc",
            },
            {
                name: "audio_technology",
                label: "công nghệ âm thanh",
            },
            {
                name: "compatible",
                label: "tương thích",
            },
            {
                name: "utilities",
                label: "tiện ích",
            },
            {
                name: "connection_support",
                label: "hỗ trợ kết nối",
            },
            {
                name: "controlled_by",
                label: "điều khiển bằng",
            },
            {
                name: "firm",
                label: "hãng",
            },
        ],
    },
    {
        type: "Bàn phím",
        category: "phukien",
        detailFields: [
            {
                name: "compatible",
                label: "tương thích",
            },
            {
                name: "connect",
                label: "cách kết nối",
            },
            {
                name: "led_light",
                label: "đèn LED",
            },
            {
                name: "number_of_keys",
                label: "số phím",
            },
            {
                name: "trademark",
                label: "thương hiệu",
            },
            {
                name: "firm",
                label: "hãng",
            },
        ],
    },
    {
        type: "Chuột không dây",
        category: "phukien",
        detailFields: [
            {
                name: "compatible",
                label: "tương thích",
            },
            {
                name: "default_resolution",
                label: "độ phân giải mặc định",
            },
            {
                name: "connect",
                label: "cách kết nối",
            },
            {
                name: "wireconn",
                label: "độ dài dây / khoảng cách kết nối",
            },
            {
                name: "led_light",
                label: "đèn LED",
            },
            {
                name: "battery_type",
                label: "loại pin",
            },
            {
                name: "weight",
                label: "khối lượng",
            },
            {
                name: "trademark",
                label: "thương hiệu",
            },
            {
                name: "made_in",
                label: "sản xuất tại",
            },
            {
                name: "firm",
                label: "hãng",
            },
        ],
    },
];

export default categoryProduct;
