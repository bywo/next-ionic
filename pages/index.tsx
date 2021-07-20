import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Home</ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon slot="icon-only" name="settings-sharp"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        <ion-grid>
          <ion-row>
            <ion-col>
              <Link href="/customizer" passHref>
                <ion-card>
                  <Image
                    src="/cat.jpg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                  <ion-card-header>
                    <ion-card-subtitle>Destination</ion-card-subtitle>
                    <ion-card-title>Madison, WI</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-icon name="pin" slot="start"></ion-icon>
                    Keep close to Nature's heart... and break clear away, once
                    in awhile, and climb a mountain or spend a week in the
                    woods. Wash your spirit clean.
                  </ion-card-content>
                </ion-card>
              </Link>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </>
  );
}
