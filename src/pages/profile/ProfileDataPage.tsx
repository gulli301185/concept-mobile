import { IonContent, IonPage, IonIcon } from "@ionic/react";
import { chevronDownOutline, informationCircleOutline } from "ionicons/icons";
import { Paper, Text, Divider, Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const ProfileDataPage = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding bg-[#f5f5f5]">
        <div className="max-w-[900px] mx-auto space-y-5 py-4">
          {/* Личные данные */}
          <Paper radius="xl" shadow="sm" p={0} withBorder>
            <div className="flex items-center justify-between px-5 py-4">
              <Text fw={700} fz={20}>
                Личные данные
              </Text>
              <button className="text-sky-500 text-sm font-medium">
                Изменить
              </button>
            </div>

            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <TextInput
                placeholder="Ваше имя"
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />

              <TextInput
                placeholder="Ваша фамилия"
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />

              <TextInput
                placeholder="Отчество"
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />

              <div className="rounded-xl bg-[#f5f7fb] border border-[#eef1f4] px-4 py-3 flex items-start gap-2 text-[#94a3b8]">
                <IonIcon
                  icon={informationCircleOutline}
                  className="text-[18px] mt-[2px]"
                />
                <Text fz="sm" c="dimmed" lh={1.3}>
                  Отчество не обязательно. Укажите, только если оно есть в
                  паспорте.
                </Text>
              </div>

              <DateInput
                valueFormat="DD.MM.YY"
                placeholder="Дата рождения"
                classNames={{
                  input:
                    "!min-h-[48px] !rounded-xl !bg-[#f5f7fb] !border-none placeholder:![rgb(238, 241, 244)] !text-base !pl-4",
                }}
              />

              <Select
                placeholder="Пол"
                data={["Мужской", "Женский"]}
                rightSection={<IonIcon icon={chevronDownOutline} />}
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />
            </div>
          </Paper>

          {/* Паспортные данные */}
          <Paper radius="xl" shadow="sm" p={0} withBorder>
            <div className="flex items-center justify-between px-5 py-4">
              <Text fw={700} fz={20}>
                Паспортные данные
              </Text>
              <button className="text-sky-500 text-sm font-medium">
                Изменить
              </button>
            </div>

            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <Select
                placeholder="Выберите гражданство"
                data={["Кыргызстан", "Казахстан", "Россия", "Узбекистан"]}
                rightSection={<IonIcon icon={chevronDownOutline} />}
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />

              <TextInput
                placeholder="Введите номер паспорта"
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: "#f5f7fb",
                    border: "1px solid #eef1f4",
                    height: 52,
                  },
                }}
              />

              <DateInput
                valueFormat="DD.MM.YY"
                placeholder="Дата окончания срока действия"
                classNames={{
                  input:
                    "!min-h-[48px] !rounded-xl !bg-[#f5f7fb] !border-none placeholder:![rgb(238, 241, 244)] !text-base !pl-4",
                }}
              />
            </div>
          </Paper>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileDataPage;
