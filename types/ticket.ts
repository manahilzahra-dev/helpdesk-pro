export type TicketStatus = "Open" | "In Progress" | "Resolved";

export type TicketPriority = "Low" | "Medium" | "High";
export type Ticket = {
    id: string;
    subject:string;
    customer: string;
    priority: TicketPriority;
    status: TicketStatus;
    date:string;

}