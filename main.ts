function AvgDistance () {
    avg_distance = 0
    for (let index = 0; index < 5; index++) {
        avg_distance = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters) + avg_distance
    }
    avg_distance = avg_distance / 10
    return avg_distance
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 2) {
        while (AvgDistance() >= 5) {
            cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0x007fff)
            basic.showLeds(`
                . . # . .
                . # # . .
                . . # . .
                . . # . .
                . # # # .
                `)
            if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
                cuteBot.motors(60, 10)
            }
            if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
                cuteBot.motors(10, 60)
            }
            if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
                cuteBot.motors(25, 25)
            }
        }
        cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0xff0000)
        cuteBot.stopcar()
        basic.showLeds(`
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
            `)
        radio.sendNumber(1)
    }
})
let avg_distance = 0
radio.setGroup(1)
