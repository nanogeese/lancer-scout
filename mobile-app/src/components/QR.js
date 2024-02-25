import QRCode from "react-native-qrcode-svg"

import { colors } from "../constants"

const QR = ({ data }) => <QRCode value={data} ecl={"M"} size={300} color={colors.black} backgroundColor={colors.white} />

export default QR