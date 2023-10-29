const deletePastReservations = async () => {
  try {
    const currentDate = new Date();
    const result = await Reservation.deleteMany({
      endDate: { $lt: currentDate },
    });
    console.log(`Usunięto ${result.deletedCount} przeszłych rezerwacji.`);
  } catch (error) {
    console.error("Błąd podczas usuwania przeszłych rezerwacji:", error);
  }
};
module.exports = deletePastReservations;
