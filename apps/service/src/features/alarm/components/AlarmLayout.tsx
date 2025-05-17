import AlarmList from "@/src/features/alarm/components/AlarmList";
import AlarmListTitle from "@/src/features/alarm/components/AlarmListTitle";

export default function AlarmLayout() {
  return (
    <div>
      <div className="bg-text02 px-3 py-2 max-w-screen-xl mobile:py-5">
        <div className="text-xl text-white">알림</div>
      </div>

      {/* 본문 */}
      <section className="min-h-[700px] px-3 py-5">
        <AlarmListTitle />
        <AlarmList />
      </section>
    </div>
  );
}
