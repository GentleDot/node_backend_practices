class FlyingMachine {
    run = () => {
        console.log("날아서 도망!")
    }
}

class GroundMachine {
    run = () => {
        console.log("뛰어서 도망!")
    }
}

class Monster {
    power = 10
    machine

    constructor(power, machine) {
        this.power = power
        this.machine = machine
    }

    attack = () => {
        console.log("공격!")
        console.log("공격력은 " + this.power + "입니다.")
    }

    run = () => {
        this.machine.run()
    }
}

const monster1 = new Monster(20, new FlyingMachine());
monster1.attack()
monster1.run()

const monster2 = new Monster(50, new GroundMachine());
monster2.attack()
monster2.run()