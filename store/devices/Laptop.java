package store.devices;

public class Laptop extends Device {
    final int battery = 1;

    public Laptop(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }

    public void showDetail() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Battery: " + battery);
    }
}