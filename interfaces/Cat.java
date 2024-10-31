package interfaces;

public class Cat implements IAnimalAction {
    @Override
    public void eat() {
        System.out.println("Eat");
    }

    @Override
    public void sleep() {
        System.out.println("Sleep");
    }

    @Override
    public void run() {
        System.out.println("Run");
    }

}
