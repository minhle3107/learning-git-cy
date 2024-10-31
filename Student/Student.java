package Student;

public class Student {
    private String name, lop, dayOfBirth;
    private int id, age;

    public Student() {
    }

    public Student(String name, int id, String lop, int age, String dayOfBirth) {
        this.name = name;
        this.id = id;
        this.lop = lop;
        this.age = age;
        this.dayOfBirth = dayOfBirth;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLop() {
        return lop;
    }

    public void setLop(String lop) {
        this.lop = lop;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(String dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    @Override
    public String toString() {
        return "Sinh viên: {Họ tên: " + name + "; id: " + id + "; lớp: " + lop + "; tuổi: " + age + "; ngày sinh: " + dayOfBirth + "}";
    }
}
