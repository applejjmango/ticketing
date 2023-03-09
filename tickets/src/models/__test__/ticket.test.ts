import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // 1. 티켓 생성
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // 2. database에 티켓 저장
  await ticket.save();

  // 3. fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // 4. make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // 5. save the first fetched ticket
  await firstInstance!.save();

  // 6. save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
  await ticket.save();
  expect(ticket.version).toEqual(3);
});
