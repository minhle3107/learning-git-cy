package store.management;

import store.devices.Laptop;

public class StoreManager {
    public static void main(String[] args) {
        Laptop laptop = new Laptop("Apple", "Macbook");

        laptop.showDetail();
    }
}
