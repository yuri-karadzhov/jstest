int max(int array[], int length) {
  int maximum = array[0];
  for (int i = 1; i < length; i++) {
    if (maximum < array[i]) {
      maximum = array[i];
    }
  }
  return maximum;
}

int main() {
  int array[] = {2, 78, -4, 5, 19, 0};
  max(array, 6);
}
