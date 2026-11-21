import Link from "next/link";
import { SITE } from "@/lib/site";

const waitlist = SITE.loansMode === "waitlist";

/** The core proposition: one watch, three options, one place. */
export function ThreeWaysTable() {
  return (
    <div className="table-scroll">
      <table className="compare">
        <thead><tr><th></th><th>Sell now</th><th>List it</th><th>Borrow</th></tr></thead>
        <tbody>
          <tr><th scope="row">What happens</th><td>We make you an offer and buy the watch from you.</td><td>You set an asking price and we publish your listing for buyers.</td><td>Your watch is security for a loan. You get it back when the loan is repaid.</td></tr>
          <tr><th scope="row">Best if</th><td>You want it done quickly and with certainty.</td><td>You want to aim for a higher price and can wait for a buyer.</td><td>You need funds but want to keep the watch.</td></tr>
          <tr><th scope="row">Trade-off</th><td>A trade offer is usually below what a private buyer might pay.</td><td>No guarantee of a sale, or of how long it takes.</td><td>Borrowing costs money, and the watch can be sold if the loan is not repaid.</td></tr>
          <tr><th scope="row">Start</th><td><Link href="/sell-my-watch">Get an offer</Link></td><td><Link href="/list-my-watch">List my watch</Link></td><td><Link href="/watch-loans">{waitlist ? "Register interest" : "Enquire"}</Link></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export function ThreeWaysLinks() {
  return (
    <div className="three-up">
      <Link href="/sell-my-watch"><strong>Sell now</strong><span>Get an offer from us</span></Link>
      <Link href="/list-my-watch"><strong>List it</strong><span>Set your own asking price</span></Link>
      <Link href="/watch-loans"><strong>Borrow</strong><span>{waitlist ? "Register interest in a loan" : "Use it as security for a loan"}</span></Link>
    </div>
  );
}
