package polymorphism.zoo.animals;

public abstract class Animal {
    String name;

    abstract void makeSound();

    public Animal() {
    }

    public Animal(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }
}
